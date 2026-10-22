
pipeline {
    agent any

    environment {
        BASE_URL = 'https://www.saucedemo.com/'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'call npm ci'
            }
        }

        stage('Install Playwright Browser') {
            steps {
                bat 'call npx playwright install chromium'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'swaglabs-test-login',
                        usernameVariable: 'SAUCE_USERNAME',
                        passwordVariable: 'SAUCE_PASSWORD'
                    )
                ]) {
                    bat 'call npx playwright test'
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
