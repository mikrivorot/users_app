## Solved problems:

# open /Users/[user]/.docker/buildx/current: permission denied
Happened after command
```
sudo docker compose up
```
https://stackoverflow.com/questions/75686903/open-users-user-docker-buildx-current-permission-denied-on-macbook
```
sudo chown -R $(whoami) ~/.docker
```


# msg="error running loki" err="mkdir /tmp/loki/index: permission denied\nerror creating index client


