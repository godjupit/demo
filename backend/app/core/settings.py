from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Community Agent Service"
    app_env: str = "development"
    openai_api_key: str = ""
    openai_url: str = ""
    openai_chat_model: str = "gpt-4o-mini"
    database_url: str = "postgresql://community:community@localhost:5432/community_agents"
    frontend_origin: str = "http://localhost:3000"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
