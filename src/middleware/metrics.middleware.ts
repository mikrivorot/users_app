import { Request, Response, NextFunction } from 'express';
import { Histogram, Registry, collectDefaultMetrics } from 'prom-client';

const register = new Registry();
collectDefaultMetrics({ register });

export const httpRequestDurationHistogram = new Histogram({
    name: 'http_request_duration_seconds',
    help: 'Latency in seconds',
    labelNames: ['method', 'route', 'status_code'],
    registers: [register],
});

export function metricsMiddleware(req: Request, res: Response, next: NextFunction) {
    const end = httpRequestDurationHistogram.startTimer();
    res.on('finish', () => {
        end({ method: req.method, route: req.route?.path || req.path, status_code: res.statusCode });
    });
    next();
}

export { register };
