
# WebSite API - NodeJS

This project is an API, wich contains all services needed to make the WebSite work.

## Funcionalities

- News registration and visualization
- Jobs registration and visualization
- Bearer Authentication and validation
- File upload and download
## Instalation

This project requires your computer to have NodeJS, and anyone package manager.

Having this, all you need to do is clone this repository:

```
    git clone https://sideaazure@dev.azure.com/sideaazure/Allintra%20Framework/_git/allintra.site-api-nodejs
```

After clone the repo, open your project folder with any terminal and run:
```
    yarn add
    
    or

    npm install
```
## Technologies

- NodeJS
- ExpressJS
- Prisma
- bcrypt
- jsonwebtoken
- nodemailer
- aws-sdk
- passport
- multer

All versions you can find on "package.json" file.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

``` DATABASE_URL ```

``` FROM_EMAIL ```

``` SMTP_EMAIL ```

``` PORT_EMAIL ```

``` PASSWORD_EMAIL ```

``` ACCESS_TOKEN_SECRET ```

``` BUCKET_NAME ```

``` AWS_ACCESS_KEY ```

``` AWS_SECRET_KEY ```

``` AWS_REGION ```
## API Reference

## User

#### Model

```
  id           String      @id @default(uuid())    **auto generated
  email        String      @unique
  password     String
```

#### Get all users

```http
  GET /api/user/getall
```

#### Get user by id

```http
  GET /api/user/getById/:id
```

#### Create user

```http
  POST /api/user/post
```

#### Delete user

```http
  DELETE /api/user/delete/:id
```

#### Login

```http
  POST /api/user/login
```

## Candidates

#### Model

```
  id                String       @id @default(uuid())   **auto generated
  name              String
  email             String       @unique
  desired_area      String
  office            String
  cell              String
  uf                String
  city              String
  linkedin          String
  curriculumLink    String?
  portfolio         String?
  created_at        DateTime     @default(now())        **auto generated
```

#### Get all candidates

```http
  GET /api/candidate/getall
```

#### Create candidate

```http
  POST /api/candidate/post
```

#### Delete candidate

```http
  DELETE /api/candidate/delete/:id
```

#### Get candidate by id

```http
  GET /api/candidate/getbyid/:id
```

## TI Candidates

#### Model

```
  id                String       @id @default(uuid())  **auto generated
  name              String
  email             String       @unique
  office            String
  cell              String
  uf                String
  city              String
  linkedin          String
  curriculumLink    String?
  portfolio         String
  created_at        DateTime     @default(now())       **auto generated
```

#### Get all candidates

```http
  GET /api/candidateIT/getall
```

#### Create candidate

```http
  POST /api/candidateIT/post
```

#### Delete candidate

```http
  DELETE /api/candidateIT/delete/:id
```

#### Get candidate by id

```http
  GET /api/candidateIT/getById/:id
```

## Curriculum

#### Upload

```http
  POST /api/curriculum/upload/{candidateId}
```

#### Download

```http
  GET /api/curriculum/download/{candidateId}
```

## NewsLetter

### List

```http
  GET /api/newsletter/getall
```

### Register

```http
  POST /api/newsletter/post
```

### Delete

```http
  DELETE /api/newsletter/delete/:id
```

## Notice

### Model

```
  id            String       @id @default(uuid())    **auto generated
  type          String
  title         String
  author        String
  describe      String
  active        Boolean      @default(true)
  created_at    DateTime     @default(now())         **auto generated
```

### List notice's

```http
  GET /api/notice/getall
```

### Add notice

```http
  POST /api/notice/post
```

### Delete notice

```http
  DELETE /api/notice/delete/:id
```

### Change notice

```http
  PUT /api/notice/update/:id
```

### Get notice by id

```http
  GET /api/notice/getById/:id
```

## Job's

### Model

```
  id                 String       @id @default(uuid())    **auto generated
  department         String
  occupation_area    String
  title              String
  describe           String
  active             Boolean      @default(true)
  created_at         DateTime     @default(now())         **auto generated
```

### List Job's

```http
  GET /api/job/getall
```

### Add Job's

```http
  POST /api/job/post
```

### Delete Job's

```http
  DELETE /api/job/delete/:id
```

### Change Job's

```http
  PUT /api/job/update/:id
```

### Get Job's by id

```http
  GET /api/job/getById/:id
```

## Contact

### Model

```
  name       String
  email      String
  message    String
```

### Send message

```
    POST /api/contact/send
```