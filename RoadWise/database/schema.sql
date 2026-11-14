-- RoadWise MySQL 8 schema (also valid on MariaDB 10.5+). Spring runs it on every start; it is idempotent.
CREATE TABLE IF NOT EXISTS traffic_signs (
  id BIGINT NOT NULL AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL,
  category VARCHAR(20) NOT NULL,
  description VARCHAR(500) NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  safety_instruction VARCHAR(500) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uk_traffic_signs_name (name),
  KEY idx_traffic_signs_category (category),
  CONSTRAINT ck_traffic_signs_category CHECK (category IN ('MANDATORY','CAUTIONARY','INFORMATORY'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS quiz_questions (
  id BIGINT NOT NULL AUTO_INCREMENT,
  question_text VARCHAR(500) NOT NULL,
  category VARCHAR(30) NOT NULL,
  difficulty VARCHAR(10) NOT NULL,
  correct_option INT NOT NULL,
  explanation VARCHAR(500) NOT NULL,
  PRIMARY KEY (id),
  KEY idx_quiz_category_difficulty (category, difficulty),
  CONSTRAINT ck_quiz_category CHECK (category IN ('BASICS','TRAFFIC_RULES','HELMET_SEATBELT','PEDESTRIAN_SAFETY','SIGNALS_SIGNS','EMERGENCY','CONDITIONS','INCLUSIVE_SAFETY')),
  CONSTRAINT ck_quiz_difficulty CHECK (difficulty IN ('EASY','MEDIUM','HARD')),
  CONSTRAINT ck_quiz_correct_option CHECK (correct_option >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS quiz_options (
  id BIGINT NOT NULL AUTO_INCREMENT,
  question_id BIGINT NOT NULL,
  position INT NOT NULL,
  option_text VARCHAR(200) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uk_quiz_options_position (question_id, position),
  CONSTRAINT fk_quiz_options_question FOREIGN KEY (question_id) REFERENCES quiz_questions (id) ON DELETE CASCADE,
  CONSTRAINT ck_quiz_options_position CHECK (position >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS safety_tips (
  id BIGINT NOT NULL AUTO_INCREMENT,
  title VARCHAR(120) NOT NULL,
  description VARCHAR(500) NOT NULL,
  category VARCHAR(20) NOT NULL,
  image_path VARCHAR(255) NULL,
  PRIMARY KEY (id),
  KEY idx_safety_tips_category (category),
  CONSTRAINT ck_safety_tips_category CHECK (category IN ('HELMET','SEATBELT','PEDESTRIAN','CYCLING','DRIVING','GENERAL'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS awareness_campaigns (
  id BIGINT NOT NULL AUTO_INCREMENT,
  title VARCHAR(150) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  category VARCHAR(30) NOT NULL,
  poster_path VARCHAR(255) NULL,
  PRIMARY KEY (id),
  KEY idx_campaigns_start_date (start_date),
  CONSTRAINT ck_campaigns_dates CHECK (end_date >= start_date),
  CONSTRAINT ck_campaigns_category CHECK (category IN ('ROAD_SAFETY_MONTH','HELMET','PEDESTRIAN','SCHOOL','COMPETITION','COMMUNITY'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- One row per anonymous visitor id (a random UUID made by the browser or server). No names or contact details.
CREATE TABLE IF NOT EXISTS pledges (
  id BIGINT NOT NULL AUTO_INCREMENT,
  visitor_id VARCHAR(36) NOT NULL,
  pledged_at DATETIME NOT NULL,
  status VARCHAR(10) NOT NULL DEFAULT 'TAKEN',
  PRIMARY KEY (id),
  UNIQUE KEY uk_pledges_visitor (visitor_id),
  CONSTRAINT ck_pledges_status CHECK (status IN ('TAKEN'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Administrators only. Passwords are stored as BCrypt hashes.
CREATE TABLE IF NOT EXISTS users (
  id BIGINT NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password_hash VARCHAR(100) NOT NULL,
  role VARCHAR(10) NOT NULL,
  created_at DATETIME NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uk_users_username (username),
  CONSTRAINT ck_users_role CHECK (role IN ('ADMIN'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
