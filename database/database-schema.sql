-- Connect to the database
\c education_db;

-- Drop tables if they exist
DROP TABLE IF EXISTS Distributions;
DROP TABLE IF EXISTS Resources;
DROP TABLE IF EXISTS Schools;
DROP TABLE IF EXISTS Suppliers;

-- Create Schools table
CREATE TABLE Schools (
    School_ID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Location VARCHAR(255) NOT NULL,
    Contact_Person VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Suppliers table
CREATE TABLE Suppliers (
    Supplier_ID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Contact VARCHAR(255) NOT NULL,
    Address TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Resources table
CREATE TABLE Resources (
    Resource_ID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Type VARCHAR(100) NOT NULL,
    Description TEXT,
    Supplier_ID INTEGER NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Supplier_ID) REFERENCES Suppliers(Supplier_ID)
);

-- Create Distributions table
CREATE TABLE Distributions (
    Distribution_ID SERIAL PRIMARY KEY,
    School_ID INTEGER NOT NULL,
    Resource_ID INTEGER NOT NULL,
    Quantity INTEGER NOT NULL CHECK (Quantity > 0),
    Date_Distributed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (Status IN ('pending', 'in_transit', 'delivered', 'cancelled')),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (School_ID) REFERENCES Schools(School_ID),
    FOREIGN KEY (Resource_ID) REFERENCES Resources(Resource_ID)
);

-- Create indexes for frequently queried columns
CREATE INDEX idx_distributions_school ON Distributions(School_ID);
CREATE INDEX idx_distributions_resource ON Distributions(Resource_ID);
CREATE INDEX idx_resources_supplier ON Resources(Supplier_ID);
CREATE INDEX idx_schools_location ON Schools(Location);
