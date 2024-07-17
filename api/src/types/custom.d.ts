import { Request } from 'express-serve-static-core';
import { SessionData } from 'express-session';

declare module 'express-session' {
    interface SessionData {
        name?: string;
        isLogged?: boolean;
        isAdmin?: boolean;
        email?: string;
        password?: string;
    }
    interface Session {
        destroy(callback: (err: any) => void): void;
    }
}

declare module 'express-serve-static-core' {
    interface MulterFile {
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        destination: string;
        filename: string;
        path: string;
        buffer: Buffer;
    }

    interface Request extends ExpressRequest {
        session: Session & Partial<SessionData>;
        files: MulterFile[];
    }
}
