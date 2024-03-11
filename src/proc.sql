-- use `adb_nhakhoa`;
-- USE `adb_nhakhoa`;
-- DELIMITER $$

-- CREATE PROCEDURE sp_addTreatment(
--     IN dentist_id_param VARCHAR(9),
--     IN assistant_id_param VARCHAR(9),
--     IN patient_id_param VARCHAR(9),
--     IN description_param VARCHAR(255),
--     IN status_param VARCHAR(50)
-- )
-- BEGIN
--     DECLARE latest_id INT;
--     DECLARE new_treatment_id VARCHAR(9);

--     -- Find the latest TREATMENT_ID
--     SELECT MAX(CAST(SUBSTRING(TREATMENT_ID, 4) AS SIGNED)) INTO latest_id
--     FROM TREATMENT;

--     -- Increment the latest ID to generate a new TREATMENT_ID
--     SET new_treatment_id = CONCAT('TRE', LPAD(latest_id + 1, 6, '0'));

--     -- Insert data into the TREATMENT table
--     INSERT INTO TREATMENT (
--         TREATMENT_ID,
--         DENTIST_ID,
--         ASSISTANT_ID,
--         PATIENT_ID,
--         DESCRIPTION,
--         STATUS
--     ) VALUES (
--         new_treatment_id,
--         dentist_id_param,
--         assistant_id_param,
--         patient_id_param,
--         description_param,
--         status_param
--     );
-- END $$
--===================================================================================================================================================
-- DELIMITER 

-- USE `adb_nhakhoa`;
-- DELIMITER $$

-- CREATE PROCEDURE sp_editTreatmentAndAppointment(
--     IN treatment_id_param VARCHAR(9),
--     IN new_description_param VARCHAR(255),
--     IN new_status_param VARCHAR(50),
--     IN new_appointment_date_param DATE,
--     IN new_appointment_shift_param VARCHAR(10)
-- )
-- BEGIN
--     -- Update DESCRIPTION and STATUS in the TREATMENT table
--     UPDATE TREATMENT
--     SET
--         DESCRIPTION = new_description_param,
--         STATUS = new_status_param
--     WHERE
--         TREATMENT_ID = treatment_id_param;

--     -- Update APPOINTMENT_DATE and APPOINTMENT_SHIFT in the APPOINTMENT table
--     UPDATE APPOINTMENT
--     SET
--         APPOINTMENT_DATE = new_appointment_date_param,
--         APPOINTMENT_SHIFT = new_appointment_shift_param
--     WHERE
--         TREATMENT_ID = treatment_id_param
--         AND APPOINTMENT_ID = 'APP01';
-- END $$

-- DELIMITER ;

--===================================================================================================================================================

-- DELIMITER $$

-- CREATE PROCEDURE sp_editTreatmentAndAppointment(
--     IN treatment_id_param VARCHAR(9),
--     IN new_description_param VARCHAR(255),
--     IN new_status_param VARCHAR(50),
--     IN new_appointment_date_param DATE,
--     IN new_appointment_shift_param VARCHAR(10)
-- )
-- BEGIN
--     -- Update DESCRIPTION and STATUS in the TREATMENT table
--     UPDATE TREATMENT
--     SET
--         DESCRIPTION = new_description_param,
--         STATUS = new_status_param
--     WHERE
--         TREATMENT_ID = treatment_id_param;

--     -- Update APPOINTMENT_DATE and APPOINTMENT_SHIFT in the APPOINTMENT table
--     UPDATE APPOINTMENT
--     SET
--         APPOINTMENT_DATE = new_appointment_date_param,
--         APPOINTMENT_SHIFT = new_appointment_shift_param
--     WHERE
--         TREATMENT_ID = treatment_id_param
--         AND APPOINTMENT_ID = 'APP01';
-- END $$

-- --===================================================================================================================================================

-- USE `adb_nhakhoa`;
-- DELIMITER $$

-- CREATE PROCEDURE sp_addMedicineInPrescription(
--     IN prescription_id_param VARCHAR(9),
--     IN medicine_id_param VARCHAR(9),
--     IN quantity_param INT
-- )
-- BEGIN
--     -- Insert data into MEDICINE_IN_PRESCRIPTION table
--     INSERT INTO MEDICINE_IN_PRESCRIPTION (
--         PRESCRIPTION_ID,
--         MEDICINE_ID,
--         QUANTITY
--     ) VALUES (
--         prescription_id_param,
--         medicine_id_param,
--         quantity_param
--     );
-- END $$

-- DELIMITER ;

-- --===================================================================================================================================================

-- USE `adb_nhakhoa`;
-- DELIMITER $$

-- CREATE PROCEDURE sp_findAppointmentsByTreatmentID(
--     IN treatment_id_param VARCHAR(9)
-- )
-- BEGIN
--     -- Select appointments from APPOINTMENT table based on given TREATMENT_ID
--     SELECT *
--     FROM APPOINTMENT
--     WHERE TREATMENT_ID = treatment_id_param;
-- END $$

-- DELIMITER ;

-- ========================================================================================================

--     USE `adb_nhakhoa`;
-- DELIMITER $$

-- CREATE PROCEDURE sp_findAppointmentsByTreatmentID(
--     IN treatment_id_param VARCHAR(9)
-- )
-- BEGIN
--     -- Select appointments from APPOINTMENT table based on given TREATMENT_ID
--     SELECT *
--     FROM APPOINTMENT
--     WHERE TREATMENT_ID = treatment_id_param;
-- END $$

-- DELIMITER ;

-- ================================================================================================================

-- USE `adb_nhakhoa`;
-- DELIMITER $$

-- CREATE PROCEDURE sp_getInvoiceDetailsByID(
--     IN invoice_id_param VARCHAR(9)
-- )
-- BEGIN
--     DECLARE treatment_id_var VARCHAR(9);
--     DECLARE appointment_date_var DATE;
--     DECLARE dentist_name_var VARCHAR(255);

--     -- Get TREATMENT_ID based on the provided INVOICE_ID
--     SELECT TREATMENT_ID INTO treatment_id_var
--     FROM INVOICE
--     WHERE INVOICE_ID = invoice_id_param
--     LIMIT 1;

--     -- Check if TREATMENT_ID is not null
--     IF treatment_id_var IS NOT NULL THEN
--         -- Get APPOINTMENT_DATE based on TREATMENT_ID and APPOINTMENT_ID
--         SELECT A.APPOINTMENT_DATE INTO appointment_date_var
--         FROM APPOINTMENT A
--         WHERE A.TREATMENT_ID = treatment_id_var
--               AND A.APPOINTMENT_ID = 'APP01';

--         -- Get DENTIST_NAME based on DENTIST_ID in TREATMENT table
--         SELECT D.FULL_NAME INTO dentist_name_var
--         FROM DENTIST D
--         JOIN TREATMENT T ON D.DENTIST_ID = T.DENTIST_ID
--         WHERE T.TREATMENT_ID = treatment_id_var;

--         -- Select data from INVOICE table and include PATIENT_ID, APPOINTMENT_DATE, DENTIST_NAME
--         SELECT I.*, T.PATIENT_ID, appointment_date_var AS APPOINTMENT_DATE, dentist_name_var AS DENTIST_NAME
--         FROM INVOICE I
--         LEFT JOIN TREATMENT T ON I.TREATMENT_ID = T.TREATMENT_ID
--         WHERE I.INVOICE_ID = invoice_id_param;
--     ELSE
--         -- If TREATMENT_ID is null, return a message or handle as needed
--         SELECT 'No invoice found for the given ID.' AS Message;
--     END IF;
-- END $$

-- DELIMITER ;

-- ================================================================================================================

-- use `adb_nhakhoa`;

-- DELIMITER $$

-- CREATE PROCEDURE sp_getInvoiceByPatientID(IN patient_id_param VARCHAR(9))
-- BEGIN
--     DECLARE treatment_id_var VARCHAR(9);

--     -- Get Treatment_ID based on Patient_ID
--     SELECT TREATMENT_ID INTO treatment_id_var
--     FROM TREATMENT
--     WHERE PATIENT_ID = patient_id_param
--     LIMIT 1;

--     -- Check if Treatment_ID is not null
--     IF treatment_id_var IS NOT NULL THEN
--         -- Select invoice based on Treatment_ID
--         SELECT *
--         FROM INVOICE
--         WHERE TREATMENT_ID = treatment_id_var;
--     ELSE
--         -- If Treatment_ID is null, return a message or handle as needed
--         SELECT 'No treatment found for the given patient.' AS Message;
--     END IF;
-- END $$

-- DELIMITER ;

-- ================================================================================================================


-- USE `adb_nhakhoa`; -- Replace with your actual database name
-- DELIMITER $$

-- CREATE PROCEDURE sp_getAllAppointments()
-- BEGIN
--     -- Select all appointments from APPOINTMENT table
--     SELECT *
--     FROM APPOINTMENT;
-- END $$

-- DELIMITER ;
-- ================================================================================================================


-- USE `adb_nhakhoa`; -- Replace with your actual database name
-- DELIMITER $$

-- CREATE PROCEDURE sp_getAllAppointments()
-- BEGIN
--     -- Select all appointments from APPOINTMENT table
--     SELECT *
     
--     FROM APPOINTMENT
--     LIMIT 2000;
   
-- END $$

-- DELIMITER ;

-- ================================================================================================================


-- USE `adb_nhakhoa`; -- Replace with your actual database name
-- DELIMITER $$

-- CREATE PROCEDURE sp_getStaff()
-- BEGIN
--     -- Select all records from the STAFF table
--     SELECT *
--     FROM STAFF;
-- END $$

-- DELIMITER ;


-- ================================================================================================================

-- USE `adb_nhakhoa`; -- Replace with your actual database name
-- DELIMITER $$

-- CREATE PROCEDURE sp_getStaffById(IN staff_id_param VARCHAR(9))
-- BEGIN
--     -- Select staff information from the STAFF table based on the provided STAFF_ID
--     SELECT *
--     FROM STAFF
--     WHERE STAFF_ID = staff_id_param;
-- END $$

-- DELIMITER ;


-- ================================================================================================================


-- USE `adb_nhakhoa`;
-- DELIMITER $$

-- CREATE PROCEDURE sp_updateAppointmentAndTreatmentDetails(
--     IN appointment_id_param VARCHAR(9),
--     IN treatment_id_param VARCHAR(9),
--     IN new_appointment_date_param DATE,
--     IN new_appointment_shift_param VARCHAR(255),
--     IN new_description_param VARCHAR(255)
-- )
-- BEGIN
--     -- Update APPOINTMENT table
--     UPDATE APPOINTMENT
--     SET
--         APPOINTMENT_DATE = new_appointment_date_param,
--         APPOINTMENT_SHIFT = new_appointment_shift_param
--     WHERE
--         APPOINTMENT_ID = appointment_id_param
--         AND TREATMENT_ID = treatment_id_param;

--     -- Update TREATMENT table
--     UPDATE TREATMENT
--     SET
--         DESCRIPTION = new_description_param
--     WHERE
--         TREATMENT_ID = treatment_id_param;
-- END $$

-- DELIMITER ;

-- ================================================================================================================

-- USE `adb_nhakhoa`;
-- DELIMITER $$

-- CREATE PROCEDURE sp_createNewTreatmentWithAppointment()
-- BEGIN
--     DECLARE new_treatment_id INT;

--     -- Get the largest existing TREATMENT_ID and increment by 1
--     SELECT MAX(TREATMENT_ID) + 1 INTO new_treatment_id FROM TREATMENT;

--     -- Insert a new treatment with the calculated TREATMENT_ID
--     INSERT INTO TREATMENT (TREATMENT_ID, DENTIST_ID, ASSISTANT_ID, PATIENT_ID, DESCRIPTION, STATUS)
--     VALUES (new_treatment_id, NULL, NULL, NULL, NULL, NULL);

--     -- Insert a new appointment with TREATMENT_ID and APPOINTMENT_ID set to "APP01"
--     INSERT INTO APPOINTMENT (APPOINTMENT_ID, TREATMENT_ID, APPOINTMENT_DATE, APPOINTMENT_SHIFT, DESCRIPTION)
--     VALUES ('APP01', new_treatment_id, NULL, NULL, NULL);
-- END $$

-- DELIMITER ;

