const fs = require('fs/promises');
const path = require('path');
const { createFile } = require("./files.utils");

const COMPONENT_PLACEHOLDER = "_COMPONENT_NAME_PLACEHOLDER_";
const COMPONENT_CSS_CLASS_NAME_PLACEHOLDER = "_COMPONENT_CSS_CLASS_NAME_PLACEHOLDER_";
const TEMPLATES_DIRECTORY = './../templates';

const generateComponent = (directoryName, componentName, type, styles, skipStyles = false, isScreen = false, isCamelCase=false) => {

    console.log(isCamelCase);

    const componentNameBits = componentName.split('-');
    let componentFormattedName = "";
    let componentCssClassName = componentName;
    componentNameBits.forEach((bit, index) => {
        if (bit.length > 0) {
            if (isCamelCase && index === 0){
                componentFormattedName += bit[0].toLowerCase() + bit.slice(1);
            } else {
                componentFormattedName += bit[0].toUpperCase() + bit.slice(1);
            }
        }
    });

    if (isScreen) {
        componentFormattedName += "Screen";
        componentCssClassName += "-screen"
    } else {
        componentFormattedName += "Component";
        componentCssClassName += "-component";
    }
    
    console.log(componentCssClassName, "componentCssClassName");

    (async () => {
        if (!skipStyles) {
            let TSXBoilerPlateCode = await fs.readFile(path.join(__dirname, TEMPLATES_DIRECTORY, 'FunctionalComponentWithStyles.txt'), 'utf8');
            if (type === "class"){
                TSXBoilerPlateCode = await fs.readFile(path.join(__dirname, TEMPLATES_DIRECTORY, 'ClassComponentWithStyles.txt'), 'utf8');
            }
            if (styles === "css"){
                TSXBoilerPlateCode = TSXBoilerPlateCode.replaceAll("scss", "css");
            }
            const SCSSBoilerPlateCode = await fs.readFile(path.join(__dirname, TEMPLATES_DIRECTORY, "Styles.txt"), 'utf8');
            let UpdatedTSXBoilerPlateCode = TSXBoilerPlateCode.replaceAll(COMPONENT_PLACEHOLDER, componentFormattedName);
            UpdatedTSXBoilerPlateCode = UpdatedTSXBoilerPlateCode.replaceAll(COMPONENT_CSS_CLASS_NAME_PLACEHOLDER, componentCssClassName);
            await createFile(`${directoryName}/${componentFormattedName}.tsx`, UpdatedTSXBoilerPlateCode).then(()=>{
                console.log(`Component ${directoryName}/${componentFormattedName}.tsx` + " created successfully");
            }).catch((error)=>{
                console.log("failed to create a component ", error);
            });
            await createFile(`${directoryName}/${componentFormattedName}.${styles}`, SCSSBoilerPlateCode).then(()=>{
                console.log(`Component ${directoryName}/${componentFormattedName}.${styles}` + " created successfully");
            }).catch((error)=>{
                console.log("failed to create a component ", error);
            });
        } else {
            let TSXBoilerPlateCode = await fs.readFile(path.join(__dirname, TEMPLATES_DIRECTORY, "FunctionalComponent.txt"), 'utf8');
            if (type === "class"){
                TSXBoilerPlateCode = await fs.readFile(path.join(__dirname, TEMPLATES_DIRECTORY, 'ClassComponent.txt'), 'utf8');
            }
            const UpdatedTsxBoilerPlateCode = TSXBoilerPlateCode.replaceAll(COMPONENT_PLACEHOLDER, componentFormattedName);
            await createFile(`${directoryName}/${componentFormattedName}.tsx`, UpdatedTsxBoilerPlateCode).then(()=>{
                console.log(directoryName + " component created successfully");
            }).catch((error)=>{
                console.log("failed to create a component ", error);
            });
        }
    })();
}

module.exports = { generateComponent };

