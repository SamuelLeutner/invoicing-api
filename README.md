# Invoicing API

### Description

The description of the project can be found [here](https://github.com/SamuelLeutner/invoicing-api/wiki)

### API Documentation

The API documentation can be found [here](https://github.com/SamuelLeutner/invoicing-api/wiki/API-endpoints-documentation)

### API Collection

The API collection can be found [here](https://www.postman.com/winter-space-365675/workspace/invoicing-api/collection/27150340-9ae9ef12-d36a-426a-bc25-992fdf4471ac?action=share&source=copy-link&creator=27150340)

### Installing

Follow these steps to get a development environment running:

#### Clone the repository

```bash
git clone https://github.com/SamuelLeutner/invoicing-api.git
```

#### Navigate to the directory
```bash
cd invoicing-api
```

#### Create docker network
```bash
docker network create invoicing-api  
```

#### Build docker
```bash
docker compose up --build -d
```

#### Install dependencies
```bash
docker compose exec node npm install
```

#### Testing

```bash
make test
```

## Authors

> [Samuel Leutner](https://github.com/SamuelLeutner)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
