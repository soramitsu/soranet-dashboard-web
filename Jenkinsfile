def buildImage = docker.image('node:10')
def tag = ["master":"latest", "develop":"develop" ]

properties([parameters([
    booleanParam(defaultValue: false, description: '', name: 'tests')
])])

pipeline {
  options {
    buildDiscarder(logRotator(numToKeepStr: '20'))
    timestamps()
  }

  agent { label 'd3-build-agent' }
  stages {
    stage ('Init') {
      steps {
        script {
          buildImage.inside("-v /var/cache/yarn:/usr/local/share/.cache/yarn") {
            // `yarn install` fails to resolve host or download pkg, retry usually helps
            int count = 0;
            int maxTries = 5;
            while (true) {
              try {
                sh "yarn install"
                break
              } catch (Exception e) {
                if (++count == maxTries) throw e;
                echo "Try ${count}/${maxTries} Failed, Retry..."
              }
            }
          }
        }
      }
    }

    stage('Build') {
      steps {
        script {
          buildImage.inside("-v /var/cache/yarn:/usr/local/share/.cache/yarn") {
            sh "yarn build"
          }
        }
      }
    }

    stage ('Test') {
      when {
        expression { return params.tests }
      }
      // TODO Currently no tests
      steps {
        script {
          buildImage.inside("-v /var/cache/yarn:/usr/local/share/.cache/yarn") {
            sh "yarn run test:unit"
          }
        }
      }
    }

    stage('Upload to Nexus') {
      when {
        expression { return (env.GIT_BRANCH in tag || env.TAG_NAME) }
      }
      steps {
        script {
          docker_tag = env.TAG_NAME ? env.TAG_NAME : tag[env.GIT_BRANCH]
          def deployImage = docker.build("nexus.iroha.tech:19001/sora-middleware/admin-panel:${docker_tag}", "-f Dockerfile .")
          docker.withRegistry('https://nexus.iroha.tech:19001', 'sora-nexus-credentials') {
            deployImage.push()
          }
        }
      }
    }
  }
  post {
    always {
      script {
        if (params.tests){
          junit 'report/*.xml'
        }
      }
    }
    cleanup {
      cleanWs()
    }
  }
}