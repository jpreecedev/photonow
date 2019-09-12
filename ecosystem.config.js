module.exports = {
  apps: [
    {
      name: "find-my-face-dev",
      script: "./dist/server/index.js"
    }
  ],
  deploy: {
    production: {
      user: "ubuntu",
      host: "ec2-34-203-244-215.compute-1.amazonaws.com",
      key: "~/.ssh/find-my-face-dev.pem",
      ref: "origin/master",
      repo: "git@github.com:jpreecedev/findmyface.git",
      path: "/home/ubuntu/deploy/find-my-face-dev",
      "post-deploy": "npm install && pm2 startOrRestart ecosystem.config.js"
    }
  }
}
