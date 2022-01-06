# Deployment to IBM Cloud Foundry

## IBM Cloud

```
https://cloud.ibm.com/login
```

## Download Cloud Foundry CLI

```
https://github.com/cloudfoundry/cli/releases
$ cf --version
```

## Login to IBM Cloud Foundry

```
$ cf login
API endpoint: https://api.us-south.cf.cloud.ibm.com
Email: ebautistau@unmsm.edu.pe
Password: YourStrongPasswordHere
```

## Deployment

```
$ npm run build
$ cd dist
$ cf push --no-start

$ cf set-env banking-ddd-nest-ebautista ENVIRONMENT prod
$ cf set-env banking-ddd-nest-ebautista BANKING_DDD_NEST_MYSQL mysql://admin:adminadmin@mysql8.cselj9r9ujlf.us-east-2.rds.amazonaws.com:3306/banking-ddd-nest

$ cf env banking-ddd-nest-ebautista

$ cf start banking-ddd-nest-ebautista
- https://banking-ddd-nest-ebautista.mybluemix.net
 
$ cf delete banking-ddd-nest-ebautista -f -r
```

## Tip - Cloud Foundry Environment Variables

```
Strings containing the following characters must be quoted:
:, {, }, [, ], ,, &, *, #, ?, |, -, <, >, =, !, %, @, \.
```

## Scale Out

```
$ cf scale <app-name> -i 2
$ cf scale <app-name> -i 3
$ cf scale <app-name> -i 8

$ cf scale banking-ddd-nest-ebautista -i 8
$ cf scale banking-ddd-nest-ebautista -i 1
```

## Scale Up - Memory

```
$ cf scale <app-name> -m 128M
$ cf scale <app-name> -m 256M
$ cf scale <app-name> -m 512M
$ cf scale <app-name> -m 1G
$ cf scale <app-name> -m 2G
$ cf scale <app-name> -m 3G
$ cf scale <app-name> -m 4G

$ cf scale banking-ddd-nest-ebautista -m 128M
$ cf scale banking-ddd-nest-ebautista -m 4G
```

## Scale Up - Disk

```
$ cf scale <app-name> -k 2G
$ cf scale banking-ddd-nest-ebautista -k 2GB
```

## 1.15