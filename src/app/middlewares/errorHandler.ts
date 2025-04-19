import { NextResponse } from 'next/server';

export const errorHandler = (handler: Function) => {
  return async (...args: any[]) => {
    try {
      return await handler(...args);
    } catch (error: any) {
      console.error('Error:', error.message || error);
      return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
    }
  };
};
