# LOKI

## Local setup

### Download
```
curl -LO https://github.com/grafana/loki/releases/download/v3.2.1/loki-darwin-amd64.zip
unzip loki-darwin-amd64.zip
chmod +x loki-darwin-amd64
sudo mv loki-darwin-amd64 /usr/local/bin/loki
chmod -R 777 ./loki
```

### Configuration file
```
curl -LO https://raw.githubusercontent.com/grafana/loki/main/cmd/loki/loki-local-config.yaml
```

### Start
```
start:loki 
```
or
```
loki -config.file=loki-config.yaml
```

