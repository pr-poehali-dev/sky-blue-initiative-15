"""Обработка заявок от пострадавших: сохранение в БД и уведомление."""
import json
import os
import psycopg2
from datetime import datetime


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": headers, "body": json.dumps({"error": "Method not allowed"})}

    body = json.loads(event.get("body") or "{}")
    name = (body.get("name") or "").strip()
    phone = (body.get("phone") or "").strip()
    amount = (body.get("amount") or "").strip()
    description = (body.get("description") or "").strip()

    if not name or not phone or not description:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "Заполните обязательные поля: name, phone, description"}),
        }

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS contact_requests (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            phone TEXT NOT NULL,
            amount TEXT,
            description TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        )
    """)

    cur.execute(
        "INSERT INTO contact_requests (name, phone, amount, description) VALUES (%s, %s, %s, %s) RETURNING id",
        (name, phone, amount, description),
    )
    request_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True, "id": request_id, "message": "Заявка принята"}),
    }
