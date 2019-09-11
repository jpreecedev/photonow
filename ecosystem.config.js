module.exports = {
  apps: [
    {
      name: "find-my-face",
      script: "./index.js"
    }
  ],
  deploy: {
    production: {
      user: "ubuntu",
      host: "http://ec2-3-91-183-71.compute-1.amazonaws.com/",
      key: "~/.ssh/find-my-face.pem",
      ref: "origin/master",
      repo: "git@github.com:jpreecedev/findmyface.git",
      path: "/home/ubuntu/find-my-face",
      "post-deploy": "npm install && pm2 startOrRestart ecosystem.config.js"
    }
  }
}
