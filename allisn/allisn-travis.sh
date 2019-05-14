# !/bin/sh
#cd $TRAVIS_BUILD_DIR/allisn
heroku container:login
#
docker tag alabamaliquidservices/botic:latest-frontend registry.heroku.com/botic-frontend/web
docker push registry.heroku.com/botic-frontend/web
heroku container:release web --app botic-frontend
#
#template
#
#docker tag <image> registry.heroku.com/<app>/<process-type>
#docker push registry.heroku.com/<app>/<process-type>