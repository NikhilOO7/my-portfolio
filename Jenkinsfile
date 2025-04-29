pipeline {
    agent any

    environment {
        NODE_VERSION = 'Node20'
        SERVER_IP = '18.224.106.120'
        DEPLOY_USER = 'deployer'
        APP_NAME = 'my-portfolio'
        APP_DIR = "/home/deployer/applications/${APP_NAME}"
        BACKEND_APP_NAME = 'my-portfolio-backend'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup') {
            steps {
                nodejs(nodeJSInstallationName: "${NODE_VERSION}") {
                    sh 'npm --version'
                    sh 'node --version'
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: "${NODE_VERSION}") {
                    sh 'npm run build'
                }
            }
        }

        stage('Prepare Server') {
            steps {
                script {
                    // Ensure the deployment directory exists
                    sh """
                        ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${SERVER_IP} '
                            mkdir -p ${APP_DIR}
                        '
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Create deployment archive
                    sh "tar -czf /tmp/${APP_NAME}.tar.gz --exclude=node_modules --exclude=.git ."
                    
                    // Create temp directory for deployer user
                    sh """
                        ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${SERVER_IP} '
                            mkdir -p /home/deployer/temp
                        '
                    """
                    
                    // Transfer and deploy
                    sh """
                        scp -o StrictHostKeyChecking=no /tmp/${APP_NAME}.tar.gz ${DEPLOY_USER}@${SERVER_IP}:/home/deployer/temp/
                        ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${SERVER_IP} '
                            mkdir -p ${APP_DIR}
                            tar -xzf /home/deployer/temp/${APP_NAME}.tar.gz -C ${APP_DIR}
                            cd ${APP_DIR}
                            npm install --production
                            
                            # Setup PM2 if not already installed
                            if ! command -v pm2 &> /dev/null; then
                                sudo npm install -g pm2
                            fi
                            
                            # Stop and restart frontend application
                            pm2 stop ${APP_NAME} || true
                            pm2 delete ${APP_NAME} || true
                            pm2 start npm --name "${APP_NAME}" -- start
                            
                            # Stop and restart backend application
                            pm2 stop ${BACKEND_APP_NAME} || true
                            pm2 delete ${BACKEND_APP_NAME} || true
                            pm2 start npm --name "${BACKEND_APP_NAME}" -- run backend
                            
                            # Save PM2 configuration
                            pm2 save
                            
                            # Clean up
                            rm -f /home/deployer/temp/${APP_NAME}.tar.gz
                        '
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment completed successfully!'
            emailext (
                subject: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: """<p>SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                <p>Check console output at <a href='${env.BUILD_URL}'>${env.BUILD_URL}</a></p>""",
                recipientProviders: [[$class: 'DevelopersRecipientProvider']]
            )
        }
        failure {
            echo 'Deployment failed!'
            emailext (
                subject: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: """<p>FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                <p>Check console output at <a href='${env.BUILD_URL}'>${env.BUILD_URL}</a></p>
                <p><b>Error:</b> ${currentBuild.description ?: 'See log for details'}</p>""",
                recipientProviders: [[$class: 'DevelopersRecipientProvider']]
            )
        }
    }
}