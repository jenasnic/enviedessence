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
2. Créer le dossier `sites/default/files/translations` et donner les droits en écritures sur le dossier `sites/default/files`
    ainsi que sur le fichier `/sites/default/settings.php`
    ```bash
    mkdir -p sites/default/files/translations
    chmod -R 777 sites/default/files
    chmod 777 sites/default/settings.php
    ```
3. Choisir le profil d'installation standard
4. Configurer la base de données
5. Configurer le site
6. Mettre à jour l'UUID du site et de la langue avec celui de la configuration
    ```bash
    grep "uuid" ./config/sync/system.site.yml
    php ./vendor/bin/drush cset system.site uuid "2d09539b-5d41-4c6a-a371-061eba6ce6d4"
    grep "uuid" ./config/sync/language.entity.fr.yml
    php ./vendor/bin/drush cset language.entity.fr uuid "de75c386-3642-4f92-b548-2a065130a5a8"
    ```
   ou avec docker
    ```bash
    docker-compose run --rm -u $(id -u ${USER}):$(id -g ${USER}) php ./vendor/bin/drush cset system.site uuid "2d09539b-5d41-4c6a-a371-061eba6ce6d4"
    docker-compose run --rm -u $(id -u ${USER}):$(id -g ${USER}) php ./vendor/bin/drush cset language.entity.fr uuid "de75c386-3642-4f92-b548-2a065130a5a8"
    ```
7. Depuis le back-office : Configuration > Interface utilisateur > Raccourcis > Lister les liens : supprimer les raccourcis\
    `http://enviedessence.local/admin/config/user-interface/shortcut/manage/default/customize`
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
