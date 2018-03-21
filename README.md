# edreel
An ecosystem to develop and deploy apps to maintain an individual's educational reel. Uses Hyperledger Fabric to create permissioned channels to enable selective sharing of profile information.


Install dependencies for composer, generators for hyperledger anf the development enviroment.
```
npm install -g composer-cli composer-rest-server generator-hyperledger-composer yo
npm install -g composer-rest-server generator-hyperledger-composer yo
```

Install the actual engine. Hyperledger Fabric
In a directory (we will assume ~/fabric-tools), get the .zip file that contains the tools to install Hyperledger Fabric:

```
mkdir ~/fabric-tools && cd ~/fabric-tools
curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.zip
```

Use the scripts you just downloaded and extracted to download a local Hyperledger Fabric runtime:

```unzip fabric-dev-servers.zip```

```cd ~/fabric-tools && ./downloadFabric.sh```

Now that the env is setup, we will move to starting Hyperledger.

Now that we are in, we will move to creating multiple networks, one for each business that hosts relationship entities from the chain.
[screenshot].

Jump to client side.

Move to the directory being bearing the name "HubridUI".

Do a ```php composer.phar install```

Apply the schema and connect the dbs.
