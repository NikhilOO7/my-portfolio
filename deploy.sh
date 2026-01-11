npm run build

scp -i "~/Documents/Project Docs/myServerKeyPair.pem" -r .next \
ubuntu@ec2-18-224-103-112.us-east-2.compute.amazonaws.com:/home/ubuntu/.next-new


ssh -i "~/Documents/Project Docs/myServerKeyPair.pem" \
ubuntu@ec2-18-224-103-112.us-east-2.compute.amazonaws.com

# on EC2:
sudo su - deployer
rm -rf /home/deployer/applications/my-portfolio/.next
cp -r /home/ubuntu/.next-new /home/deployer/applications/my-portfolio/.next


cd /home/deployer/applications/my-portfolio
pm2 restart my-portfolio || pm2 start npm --name my-portfolio -- run start
pm2 save

