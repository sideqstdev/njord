require('dotenv').config()

export const dev: boolean = process.env.DEV_MODE ? process.env.DEV_MODE === "true" : true;

export const fallbackPort: number = 8080;
export const port: number = Number(process.env.PORT);

export const accessSecret = process.env.ACCESS_TOKEN_SECRET;
export const refreshSecret = process.env.REFRESH_TOKEN_SECRET;