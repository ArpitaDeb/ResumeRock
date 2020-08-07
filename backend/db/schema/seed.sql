INSERT INTO
  users (id, username, email, password)
VALUES
  (1, 'SuperMario', 'mario@nintendo.com', 'test');

INSERT INTO
  users (id, username, email, password)
VALUES
  (2, 'Luigi', 'luigi@nintendo.com', 'test');

INSERT INTO
  users (id, username, email, password)
VALUES
  (3, 'Peach', 'peach@nintendo.com', 'test');

INSERT INTO
  resumes(id, user_id, resumedata)
VALUES
  (
    1,
    1,
    '{
    "personalInfo": {"first_name": "ARPITA",
		"last_name": "DEB",
    "prof_title": "Mrs.",
		"email": "arpitadeb1990@gmail.com",
    "linkedIn": "www.arpita.com",
		"phone_number": "3062414180",
		"address_line1": "1290 Lassiter Terrace",
		"city": "Gloucester",
		"province": "ON",
		"postal_code": "K1J8N1"
	},
	"summary": {
		"heading": "summary",
		"body": "I am beginner"
	},
	"educations": {
		"educationInfo": [
			{
				"institution": "RCCIIT",
				"fieldOfStudy": "ECE",
				"typeOfDegree": "BTech",
				"GPA": "4",
				"start_date": "2020-08-06T04:00:00.000Z",
				"end_date": "2020-08-29T04:00:00.000Z",
				"in_progress": false,
				"city": "Vancouver",
				"country": "Canada"
			}
		],
		"heading": "Education"
	},
	"core_competencies": {
		"skills": [
			{
				"name": "Javascript",
				"rating": 4
			},
			{
				"name": "Eating",
				"rating": 5
			}
		],
		"heading": "skill"
	},
  "experience": {
		"heading": "Experience",
		"experiences": [
			{
				"employer_name": "IBM",
				"employer_description": "International Business Machine",
				"job_title": "Service Delivery Specialist",
				"start_date": "2019-07-31T21:35:38.000Z",
				"end_date": "2020-08-14T21:35:38.000Z",
				"present": false,
				"city": "Saskatoon",
				"country": "Canada",
				"responsibilities": [
					"Periodic Compliance Performance ",
					"Scheduling weekly meeting"
				],
				"achievements": [
					"Certificate of Excellence awards",
					"2 years experience"
				]
			}
		]
  },
  "references": {
		"referees": [
			{
				"name": "",
				"email": "",
				"req": true
			}
		],
		"heading": "Reference"
	}
  }' :: jsonb
  );