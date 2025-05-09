/**
 * Script para ayudar a organizar y limpiar la estructura de carpetas del proyecto
 * 
 * Instrucciones:
 * 1. Ejecutar con: node scripts/organize.js
 * 2. Seguir las instrucciones en consola
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');

// Colores para la consola
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m'
};

// Función para listar archivos no referenciados
async function findUnreferencedFiles() {
    console.log(`${colors.bright}${colors.blue}Buscando archivos potencialmente no utilizados...${colors.reset}`);
    
    // Obtener todos los archivos .tsx y .scss
    const allFiles = getAllFilesInDir(SRC_DIR, ['.tsx', '.scss', '.ts'])
        .filter(file => !file.includes('node_modules'));
    
    // Leer todos los archivos y buscar referencias
    const filesContent = {};
    const referencedFiles = new Set();
    
    for (const file of allFiles) {
        const content = fs.readFileSync(file, 'utf8');
        filesContent[file] = content;
        
        // Buscar importaciones
        const importMatches = content.match(/from\s+['"]([^'"]+)['"]/g) || [];
        for (const match of importMatches) {
            const importPath = match.replace(/from\s+['"]([^'"]+)['"]/, '$1');
            
            if (importPath.startsWith('.')) {
                // Es una importación relativa
                const resolvedPath = resolveRelativePath(file, importPath);
                if (resolvedPath) {
                    referencedFiles.add(resolvedPath);
                    
                    // También agregar las variantes con extensión
                    const extensions = ['.tsx', '.ts', '.js', '.jsx'];
                    for (const ext of extensions) {
                        referencedFiles.add(resolvedPath + ext);
                    }
                }
            }
        }
        
        // Buscar referencias a estilos
        const styleMatches = content.match(/import\s+['"]([^'"]+\.scss)['"]/g) || [];
        for (const match of styleMatches) {
            const stylePath = match.replace(/import\s+['"]([^'"]+\.scss)['"]/, '$1');
            
            if (stylePath.startsWith('.')) {
                const resolvedPath = resolveRelativePath(file, stylePath);
                if (resolvedPath) {
                    referencedFiles.add(resolvedPath);
                }
            }
        }
    }
    
    // Encontrar archivos no referenciados
    // Excluir archivos principales que conocemos que son usados
    const mainFiles = [
        path.join(SRC_DIR, 'App.tsx'),
        path.join(SRC_DIR, 'main.tsx'),
        path.join(SRC_DIR, 'vite-env.d.ts'),
        path.join(SRC_DIR, 'styles', 'App.scss'),
        path.join(SRC_DIR, 'styles', 'main.scss'),
        path.join(SRC_DIR, 'components', 'index.ts'),
        path.join(SRC_DIR, 'pages', 'index.ts')
    ];
    
    for (const file of mainFiles) {
        referencedFiles.add(file);
    }
    
    // Buscar archivos no referenciados
    const unreferencedFiles = allFiles.filter(file => !referencedFiles.has(file));
    
    console.log(`\n${colors.bright}${colors.yellow}Archivos potencialmente no utilizados:${colors.reset}`);
    unreferencedFiles.forEach(file => {
        console.log(`${colors.red}${file.replace(ROOT_DIR, '')}${colors.reset}`);
    });
    
    return { unreferencedFiles, filesContent };
}

// Función para resolver rutas relativas
function resolveRelativePath(fromFile, importPath) {
    const dir = path.dirname(fromFile);
    
    // Eliminar posibles extensiones del import path
    let cleanPath = importPath;
    const extensions = ['.tsx', '.ts', '.js', '.jsx', '.scss'];
    for (const ext of extensions) {
        if (cleanPath.endsWith(ext)) {
            cleanPath = cleanPath.slice(0, -ext.length);
            break;
        }
    }
    
    // Resolver la ruta
    return path.resolve(dir, cleanPath);
}

// Función para obtener todos los archivos en un directorio (recursivo)
function getAllFilesInDir(dir, extensions = null) {
    let results = [];
    
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllFilesInDir(filePath, extensions));
        } else {
            if (!extensions || extensions.some(ext => filePath.endsWith(ext))) {
                results.push(filePath);
            }
        }
    }
    
    return results;
}

// Menú principal
async function mainMenu() {
    console.log(`\n${colors.bright}${colors.green}=== Organizador de Proyecto Parchify ===${colors.reset}`);
    console.log('1. Buscar archivos no utilizados');
    console.log('2. Verificar estructura de carpetas');
    console.log('3. Salir');
    
    const answer = await askQuestion('\nSeleccione una opción: ');
    
    switch (answer) {
        case '1':
            await findUnreferencedFilesMenu();
            break;
        case '2':
            await verifyFolderStructure();
            break;
        case '3':
            console.log(`${colors.green}¡Adiós!${colors.reset}`);
            rl.close();
            break;
        default:
            console.log(`${colors.red}Opción inválida${colors.reset}`);
            await mainMenu();
            break;
    }
}

// Menú para archivos no utilizados
async function findUnreferencedFilesMenu() {
    const { unreferencedFiles } = await findUnreferencedFiles();
    
    if (unreferencedFiles.length === 0) {
        console.log(`${colors.green}No se encontraron archivos sin referencia.${colors.reset}`);
        await mainMenu();
        return;
    }
    
    console.log(`\n${colors.bright}${colors.yellow}Se encontraron ${unreferencedFiles.length} archivos potencialmente no utilizados.${colors.reset}`);
    console.log(`${colors.yellow}NOTA: Esta herramienta es de ayuda, pero no garantiza al 100% que los archivos no sean utilizados.${colors.reset}`);
    console.log(`${colors.yellow}Revise manualmente antes de borrar.${colors.reset}\n`);
    
    await mainMenu();
}

// Función para verificar la estructura de carpetas
async function verifyFolderStructure() {
    console.log(`${colors.bright}${colors.blue}Verificando estructura de carpetas...${colors.reset}`);
    
    const expectedStructure = [
        'src/components',
        'src/components/events',
        'src/components/calendar',
        'src/components/dashboard',
        'src/components/layout',
        'src/pages',
        'src/pages/EventsPage',
        'src/pages/CalendarPage',
        'src/pages/Dashboard',
        'src/pages/SavedEventsPage',
        'src/pages/DraftsPage',
        'src/pages/EventFormPage',
        'src/styles',
        'src/styles/abstracts',
        'src/types',
        'src/constants'
    ];
    
    let allExists = true;
    
    for (const folder of expectedStructure) {
        const fullPath = path.join(ROOT_DIR, folder);
        if (!fs.existsSync(fullPath)) {
            console.log(`${colors.red}Falta carpeta: ${folder}${colors.reset}`);
            allExists = false;
        }
    }
    
    if (allExists) {
        console.log(`${colors.green}Todas las carpetas esperadas existen.${colors.reset}`);
    } else {
        console.log(`${colors.yellow}Algunas carpetas esperadas no existen.${colors.reset}`);
    }
    
    await mainMenu();
}

// Función para hacer preguntas
function askQuestion(question) {
    return new Promise(resolve => {
        rl.question(question, answer => {
            resolve(answer);
        });
    });
}

// Iniciar la aplicación
(async () => {
    await mainMenu();
})(); 