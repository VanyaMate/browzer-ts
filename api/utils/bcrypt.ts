import bcrypt from 'bcrypt';

const defaultRounds = 2;

export const encrypt = function (value: string, rounds: number = defaultRounds): Promise<string> {
    return new Promise<string>(async (resolve: (hash: string) => void, reject) => {
        await bcrypt.hash(value, rounds).then(resolve).catch(reject);
    })
}

export const compare = function (first: string, second: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve: (result: boolean) => void, reject) => {
        await bcrypt.compare(first, second, (error: any, result: boolean) => {
            if (error) reject(error)
            else resolve(result);
        })
    })
}