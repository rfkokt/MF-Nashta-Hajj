import fs from 'node:fs';
import path from 'node:path';
import { brotliCompressSync } from 'node:zlib';

// Define budget limits in Kilobytes (KB)
const BUDGETS = {
  js: 250, // 250 KB max for JS
  css: 50, // 50 KB max for CSS
};

function getDirFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getDirFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

function getBrotliSize(filePath: string): number {
  const fileContent = fs.readFileSync(filePath);
  const compressed = brotliCompressSync(fileContent);
  return compressed.length;
}

function checkBudgets() {
  const appsDir = path.join(process.cwd(), 'apps');
  
  if (!fs.existsSync(appsDir)) {
    console.error(`Error: Directory ${appsDir} not found.`);
    process.exit(1);
  }

  const apps = fs.readdirSync(appsDir).filter(f => fs.statSync(path.join(appsDir, f)).isDirectory());
  let hasErrors = false;

  console.log('\n📊 Bundle Budget Verification\n');

  for (const app of apps) {
    const appDistDir = path.join(appsDir, app, 'dist');
    if (!fs.existsSync(appDistDir)) {
       console.log(`Skipping app: ${app} (No dist folder found)`);
       continue;
    }

    console.log(`Checking app: ${app}`);
    const files = getDirFiles(appDistDir);
    
    let totalJsSize = 0;
    let totalCssSize = 0;

    for (const file of files) {
      if (file.endsWith('.js') && !file.includes('remoteEntry.js')) {
        totalJsSize += getBrotliSize(file);
      } else if (file.endsWith('.css')) {
        totalCssSize += getBrotliSize(file);
      }
    }

    const jsSizeKb = totalJsSize / 1024;
    const cssSizeKb = totalCssSize / 1024;

    console.log(`  JS Size : ${jsSizeKb.toFixed(2)} KB (Target: < ${BUDGETS.js} KB)`);
    console.log(`  CSS Size: ${cssSizeKb.toFixed(2)} KB (Target: < ${BUDGETS.css} KB)`);

    if (jsSizeKb > BUDGETS.js) {
      console.error(`  ❌ JS budget exceeded for ${app}!`);
      hasErrors = true;
    }
    if (cssSizeKb > BUDGETS.css) {
      console.error(`  ❌ CSS budget exceeded for ${app}!`);
      hasErrors = true;
    }
    console.log('');
  }

  if (hasErrors) {
    console.error('💥 Budget verification failed! Bundle size exceeds maximum limits.');
    process.exit(1);
  } else {
    console.log('✅ All apps are within the defined performance budgets.');
  }
}

checkBudgets();
