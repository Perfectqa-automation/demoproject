
pipeline {
    agent any

    environment {
        DOCKER = 'C:\\Users\\Shashank\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe'
        BASE_URL = 'https://www.saucedemo.com/'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat '"%DOCKER%" build -t swaglabs-playwright:1.0 .'
            }
        }

        stage('Run Playwright Tests in Docker') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'swaglabs-test-login',
                        usernameVariable: 'SAUCE_USERNAME',
                        passwordVariable: 'SAUCE_PASSWORD'
                    )
                ]) {
                    bat '"%DOCKER%" run --rm -e BASE_URL="%BASE_URL%" -e SAUCE_USERNAME="%SAUCE_USERNAME%" -e SAUCE_PASSWORD="%SAUCE_PASSWORD%" swaglabs-playwright:1.0'
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'playwright-report/**, test-results/**',
                allowEmptyArchive: true
            )

            publishHTML(target: [
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report',
                keepAll: true,
                alwaysLinkToLastBuild: true,
                allowMissing: true
            ])
        }
    }
}
