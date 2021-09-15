import * as path from "path";
import * as webpack from "webpack";

const config: webpack.Configuration = {
    mode: "development",
    entry: "./pages/index.tsx",
    resolve: {
        alias: {
            "~/styles": path.resolve(__dirname, "styles/"),
            "~/components": path.resolve(__dirname, "components/"),
            "~/public": path.resolve(__dirname, "public/"),
            "~/pages": path.resolve(__dirname, "pages/"),
            "~/graphql": path.resolve(__dirname, "graphql/")
        },
        extensions: [".css", ".sass", ".scss", ".tsx"]   //allow import without these extensions 
    },
    output: {
        assetModuleFilename: "images/[hash][ext]",
        publicPath: "/_next/static/images/",
        
    },
    module: {
        rules: [
            {
            test: /\.(png|jpg|jpeg|gif|svg)$/i,
            type: "asset/resource"
            }
        ]
    },
}