const { WebServer, pathConcat, getLogger } = require("maishu-node-web-server");
const path = require("path");
const fs = require("fs");

const static_dir = "static";

/**
 * 插件入口函数
 * @param {WebServer} webServer 
 */
function main(webServer) {
    let logger = getLogger(require("./package.json").name, webServer.logLevel);

    let names = fs.readdirSync(path.join(__dirname, static_dir));
    for (let i = 0; i < names.length; i++) {
        let fileName = names[i];
        let physicalPath = webServer.websiteDirectory.findFile(fileName);
        if (physicalPath) {
            continue;
        }

        physicalPath = path.join(__dirname, static_dir, fileName);
        if (!fs.statSync(physicalPath).isFile()) {
            continue;
        }


        webServer.websiteDirectory.setPath(fileName, physicalPath);
        logger.info(`Set virtual path ${fileName} ${physicalPath}`);
    }
}

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = main;