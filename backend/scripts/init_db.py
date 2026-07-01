from pathlib import Path

import psycopg

from app.core.settings import settings


def main() -> None:
    schema = Path(__file__).resolve().parents[1] / "app" / "db" / "schema.sql"
    sql = schema.read_text(encoding="utf-8")
    with psycopg.connect(settings.database_url) as connection:
        with connection.cursor() as cursor:
            cursor.execute(sql)
        connection.commit()
    print(f"Applied schema: {schema}")


if __name__ == "__main__":
    main()
