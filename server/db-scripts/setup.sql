-- 1. Create Agents Table
CREATE TABLE agents (
    agent_id INT AUTO_INCREMENT PRIMARY KEY,
    agent_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- 2. Create Users Table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    user_number VARCHAR(20) NOT NULL
);

-- 3. Create Policies Table
CREATE TABLE policies (
    policy_id INT AUTO_INCREMENT PRIMARY KEY,
    policy_name VARCHAR(150) NOT NULL,
    policy_summary VARCHAR(255),
    policy_details TEXT
);

-- 4. Create User Type Table (With Role Enum)
CREATE TABLE user_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    role ENUM('user', 'agent') NOT NULL
);

-- 5. Create Agent-User Mapping (Many-to-Many)
CREATE TABLE agent_user_mapping (
    mapping_id INT AUTO_INCREMENT PRIMARY KEY,
    agent_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (agent_id) REFERENCES agents(agent_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_assignment (agent_id, user_id)
);

-- 6. Create User-Policies Mapping (Many-to-Many)
CREATE TABLE user_policies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    policy_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (policy_id) REFERENCES policies(policy_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_policy (user_id, policy_id)
);

-- --- SAMPLE DATA ---

INSERT INTO agents (agent_name, email, password) VALUES ('Agent Smith', 'smith@agency.com', 'agent_pw_789');
INSERT INTO users (user_name, email, password, user_number) VALUES ('John Doe', 'john@example.com', 'hashed_pw_123', '555-0101');

-- Testing the Enum Role
INSERT INTO user_types (email, role) VALUES 
('smith@agency.com', 'agent'), 
('john@example.com', 'user');

INSERT INTO policies (policy_name, policy_summary) VALUES ('Full Coverage', 'Covers everything');
INSERT INTO agent_user_mapping (agent_id, user_id) VALUES (1, 1);
INSERT INTO user_policies (user_id, policy_id) VALUES (1, 1);