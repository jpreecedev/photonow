module.exports = {
  apps: [
    {
      name: "PhotoNow",
      script: "./dist/server/index.js"
    }
  ],
  deploy: {
    production: {
      user: "root",
      host: "178.62.71.31",
      key: "~/.ssh/id_rsa",
      ref: "origin/master",
      repo: "git@github.com:jpreecedev/photonow.git",
      path: "/home/root/source/photonow",
      "post-deploy": "npm install && pm2 startOrRestart ecosystem.config.js"
    }
  }
}
