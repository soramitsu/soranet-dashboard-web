@Library('jenkins-library' ) _

def pipeline = new org.js.AppPipeline(steps: this,
    dockerImageName: 'soranet/dashboard-web',
    dockerRegistryCred: 'bot-soranet-rw',
    dockerImageTags: ['master': 'latest', 'develop': 'develop']
pipeline.runPipeline()