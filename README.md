# kalulu-server

To run the app image on DockerHub, first create a folder where you want the app to save the files containing the data sent to the server in each request. Suppose this folder is `/var/received`. Then you can create a container as follows:

```bash
docker run -d --name kalulu -p 8080:3000 -v "/var/received":"/app/received" danielmmartin/kalulu-server:latest
```

The app will receive the requests in the endpoint `/log` via POST method using application/x-www-form-urlencoded Content-Type in the body.

If you are running this server and Kalulu in the same machine, set `SERVER_URL` to `http://localhost:8080` and `SERVER_SCRIPT_RELATIVE_PATH` to `/log`.
