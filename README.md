# PRE-INSTALLATION

## Utilisation de docker/docker-compose :

1. Si besoin créer un fichier `docker-compose.override.yaml` pour personnaliser l'installation

2. Lancer docker : `docker-compose up -d`

3. Installer les dépendances : `make install`\
    **NOTE** : si make n'est pas dispo => utiliser les commandes docker-compose
    ```bash
    docker-compose run --rm -u $(id -u ${USER}):$(id -g ${USER}) php composer install
    docker-compose run --rm -u $(id -u ${USER}):$(id -g ${USER}) node yarn --cwd ./themes/enviedessence install
    docker-compose run --rm -u $(id -u ${USER}):$(id -g ${USER}) node yarn --cwd ./themes/enviedessence build
    ```

## Utilisation sans docker (PHP 7.4, Mysql 5.7) :

```bash
composer install
yarn --cwd ./themes/enviedessence install
yarn --cwd ./themes/enviedessence build
```

# INSTALLATION DRUPAL

1. Ouvrir le site dans le navigateur (sous docker => enviedessence.local par défaut)
2. Créer le dossier `sites/default/files` et donner les droits en écritures sur ce dossier ainsi que sur le fichier `/sites/default/settings.php`
    ```bash
    mkdir -p sites/default/files
    chmod -R 777 sites/default/files
    chmod 777 sites/default/settings.php
    ```
3. Choisir le profil d'installation standard
4. Configurer la base de données
5. Configurer le site
6. Créer le fichier `sites/default/setttings.local.php` et déplacer la configuration de la base de données définie dans `sites/default/settings.php` + ajouter les lignes suivantes (pour éviter les problèmes lors de l'installation du thème)
    ```
    $config['system.performance']['css']['preprocess'] = FALSE;
    $config['system.performance']['js']['preprocess'] = FALSE;
    ```
7. Mettre à jour les UUID du site, de la langue et des raccourcis avec celui de la configuration
    ```bash
    grep "uuid" ./config/sync/system.site.yml
    php ./vendor/bin/drush cset system.site uuid "2d09539b-5d41-4c6a-a371-061eba6ce6d4"
    grep "uuid" ./config/sync/language.entity.fr.yml
    php ./vendor/bin/drush cset language.entity.fr uuid "de75c386-3642-4f92-b548-2a065130a5a8"
    grep "uuid" ./config/sync/shortcut.set.default.yml
    php ./vendor/bin/drush cset shortcut.set.default uuid "928e1a2a-69ce-418c-b175-c9b743096e88"
    ```
   ou avec docker
    ```bash
    docker-compose run --rm -u $(id -u ${USER}):$(id -g ${USER}) php ./vendor/bin/drush cset system.site uuid "2d09539b-5d41-4c6a-a371-061eba6ce6d4"
    docker-compose run --rm -u $(id -u ${USER}):$(id -g ${USER}) php ./vendor/bin/drush cset language.entity.fr uuid "de75c386-3642-4f92-b548-2a065130a5a8"
    docker-compose run --rm -u $(id -u ${USER}):$(id -g ${USER}) php ./vendor/bin/drush cset shortcut.set.default uuid "928e1a2a-69ce-418c-b175-c9b743096e88"
    ```
8. Importer la configuration du site
    ```bash
    php ./vendor/bin/drush config:import
    ```
   ou avec docker
    ```bash
    docker-compose run --rm -u $(id -u ${USER}):$(id -g ${USER}) php ./vendor/bin/drush config:import
    ```
9. Retirer les droits en écritures sur le dossier `sites/default/files` et le fichier `/sites/default/settings.php`
    ```bash
    chmod -R 744 sites/default/files
    chmod 644 sites/default/settings.php
    ```
10. Vider les caches via la commande drush cr (ou make cache)

[warning] The "block_content:0c73162e-68d4-4828-bb28-1be5aa4bfa47" was not found
[notice] Synchronisation de la configuration : create block.block.menureseauxsociaux.
[warning] The "block_content:01580a6a-22fb-4066-8c99-e3c769e4d922" was not found
[notice] Synchronisation de la configuration : create block.block.footerreseauxsociaux.
[warning] The "block_content:8dcf2732-66b8-4471-b185-4dc9b69c1085" was not found
[notice] Synchronisation de la configuration : create block.block.accueilseminaire.
[warning] The "block_content:da49b584-cb69-44f8-8336-2dbf4fc232bc" was not found
[notice] Synchronisation de la configuration : create block.block.accueilenviedessence.
[warning] The "block_content:43685dd2-001b-4219-b943-8558c4c93952" was not found
[notice] Synchronisation de la configuration : create block.block.accueilderniersblogs.
[warning] The "block_content:e7da0845-0a24-42db-b5c2-de3fa39fc180" was not found
[notice] Synchronisation de la configuration : create block.block.accueilcompetences.
[warning] The "block_content:528ae719-7f07-4762-b510-649c3c0ff8f2" was not found
[notice] Synchronisation de la configuration : create block.block.accueilbanniere.
[warning] The "block_content:c83765ea-a101-40fe-bd74-a516ff83cf2d" was not found
[notice] Synchronisation de la configuration : create block.block.blogbanniere.
