
const Sunucu_1 = "wex";
module.exports = {
    apps: [
   
        {
            name: `Fundamental`,
            namespace: "wex_v13",
            script: "./Fundamental/main.js",
            watch: false
        },
     
        {
            name: `Operator`,
            namespace: "wex_v13",
            script: "./Operator/main.js",
            watch: false
        },   
        {
            name: `Statistic`,
            namespace: "wex_v13",
            script: "./Statistics/main.js",
            watch: false
        },
        {
            name: `ShieldBackup`,
            namespace: "wex_v13",
            script: "./ShieldBackup/main.js",
            watch: false
        },
        {
            name: `ShieldTwo`,
            namespace: "wex_v13",
            script: "./Shield/main.js",
            watch: false
        },


    ]
};
