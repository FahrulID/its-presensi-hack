# ITS Presensi Attendance System Vulnerability

Author: Fahrul Ramadhan Putra

##

Status: Fixed

## Issue Description
CWE-20: Improper Input Validation. The application does not validate or incorrectly validates input that can affect the control flow or data flow of a program. When software does not validate input properly, an attacker is able to craft the input in a form that is not expected by the rest of the application. This will lead to parts of the system receiving unintended input, which may result in altered control flow, arbitrary control of a resource, or arbitrary code execution.

## Issue Identified
I identified that the attendance system is vulnerable, this is due to the fact that the application does not validate the input of the user for the "Izin Tidak Hadir" feature. This allows a user to submit the request with jenis_hadir_izin_mhs to be H (Hadir) or A (Alpha) instead of I (Izin) and S (Sakit) as intended. With this vulnerability the user can be marked as present where they were not present. This could be exploited by users to gain attendance for their midterms and finals requirement of attendance.

## Risk Breakdown
- Risk: **Low**

The risk associated with this vulnerability is categorized as low since it does not directly compromise the integrity, availability, or confidentiality of the application. The underlying flaw does not expose sensitive information or grant unauthorized access to the system.

- Impact: **High**

The vulnerability allows students to manipulate their attendance records easily. While this may seem trivial at first glance, it can have serious consequences when students attempt to fulfill attendance requirements for midterms and finals.

- Difficulty to Exploit: **Easy**

Exploiting this vulnerability is straightforward, requiring no advanced tools, scripts, or technical skills. Any student with basic knowledge of the attendance system can manipulate their own attendance records effortlessly, thereby circumventing the intended controls.

## Affected URLs
 - https://presensi.its.ac.id/tatap-muka/*
 - https://presensi.its.ac.id/kehadiran-mahasiswa/updateizinmhs

## Steps to Reproduce
The following steps indicate a proof of concept to reproduce and execute the issue.

**Step 1:**
Navigate to https://presensi.its.ac.id/dashboard and select the course.

**Step 2:**
Select the "Izin Tidak Hadir" button for desired Tatap Muka. In the form that appears change the value of jenis_hadir_izin_mhs to H (Hadir) using "inspect element" feature of browsers and then submit the form.

Or by using the extension in this repository.

## Affected Demographic
This issue will only affect the attacker student.

## Recommendation
Don't forget to also validate the input of the user on the server side. This is because the client side validation can be bypassed by the attacker.

## References
For more information on remediation steps check out reference.

 - [1] [OWASP Improper Data Validation Explained](https://owasp.org/www-community/vulnerabilities/Improper_Data_Validation)
 - [2] [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
