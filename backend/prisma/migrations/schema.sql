CREATE TABLE tasks (
    -- id: creates a unique number for every task that increases automatically
    id SERIAL PRIMARY KEY, 
    
    -- title: the name of the task (cannot be empty)
    title VARCHAR(255) NOT NULL, 
    
    -- description: longer text for details (can be empty)
    description TEXT, 
    
    -- is_completed: a checkbox (true/false), starts as false
    is_completed BOOLEAN DEFAULT false, 
    
    -- created_at: records the exact time the task was added
    created_at TIMESTAMPTZ DEFAULT NOW() 
);