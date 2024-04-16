# PinHub-S (Server)

An application that creates notes based on a map

## Characteristics

- MSA Programming for scalability
- test-driven development
- for Handling High-Capacity Traffic

## Environment

- Language: TypeScript
- Server Engine: Node.js(v20.11.1)
- DataBase: Postgres

## branch process

- feature-{feature name}
  ->feature
  -> develop
  -> main
  -> release

## DataBase Schema

#### User

- UserID PK int
- UserImageID FK >- File.FileID
- Nickname UNIQUE string
- SocialID UNIQUE string

#### Device

- DeviceID PK int
- DeviceUUID UNIQUE string
- UserID int FK >- User.UserID

#### File

- FileID PK int
- URL UNIQUE string
- Extension string
- Type string
- Size float

#### Memo

- MemoID PK int
- IsShare bool
- Title string
- Content string
- ImageID FK >- File.FileID
- isDelete bool
- CoordinateID FK >- Coordinate.CoordinateID

#### Coordinate

- CoordinateID PK int
- longitude float
- latitude float

#### Banner

- BannerID PK int
- IsActive bool
- Title string
- Content string
- ImageID FK >- File.FileID

#### Admin

- AdminID PK int
- loginID string
- Password string

#### LikeMemo

- UserID FK >- User.UserID
- MemoID FK >- Memo.MemoID
