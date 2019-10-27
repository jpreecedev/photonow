module.exports = {
  apps: [
    {
      name: "PhotoNow",
      script: "./dist/server/index.js",
      env: {
        NODE_ENV: "production"
      }
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
      "post-deploy":
        "npm install && npm run build:next && npm run build:server pm2 startOrRestart ecosystem.config.js"
    }
  }
}
