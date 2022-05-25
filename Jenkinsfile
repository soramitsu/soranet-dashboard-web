@Library('jenkins-library' ) _

def pipeline = new org.js.AppPipeline(steps: this,
    dockerImageName: 'soranet/dashboard-web',
    dockerRegistryCred: 'bot-soranet-rw',
    test: false,
    dockerImageTags: ['master': 'latest', 'develop': 'develop'],
    sonarProjectName: 'soranet-dashboard-web',
    sonarProjectKey: 'jp.co.soramitsu:soranet-dashboard-web',
    )
pipeline.runPipeline()