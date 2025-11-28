import express from 'express';
import { throwError } from './response';

const suspiciousKeys = ['__proto__', 'constructor', 'prototype'];

function isPlainObject(obj: any): boolean {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

function hasSuspiciousKeys(obj: any): boolean {
  for (const key in obj) {
    if (suspiciousKeys.includes(key)) {
      return true;
    }

    if (typeof obj[key] === 'object' && obj[key] !== null) {
      if (hasSuspiciousKeys(obj[key])) return true;
    }
  }
  return false;
}

function isSerializable(obj: any): boolean {
  try {
    JSON.stringify(obj);
    return true;
  } catch {
    return false;
  }
}

export function validateJsonPayloadMiddleware() {
  return function (req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const payload = req.body;

      // Only validate for relevant HTTP methods
      if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        // Must be a plain object
        if (!isPlainObject(payload)) {
          return throwError("Payload must be a valid JSON object", 400);
        }

        // Check for suspicious keys
        if (hasSuspiciousKeys(payload)) {
          return throwError("Potential JSON injection detected", 400);
        }

        // Check if payload is serializable
        if (!isSerializable(payload)) {
          return throwError("Payload contains non-serializable data", 400);
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
