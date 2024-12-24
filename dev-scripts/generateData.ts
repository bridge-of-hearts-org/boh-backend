import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import Facility from "../src/models/ChildCareFacility";

import connectDb from "../src/config/db";

const generateFakeData = (itemCount: number) => {
    return Array.from({ length: itemCount }).map(() => {
        const phoneNumbers: string[] = [];
        const phoneNumberCount: number = faker.number.int({ min: 1, max: 3 });

        const emails: string[] = [];
        const emailsCount: number = faker.number.int({ min: 0, max: 2 });

        for (let i: number = 0; i < phoneNumberCount; i++) {
            phoneNumbers.push(faker.phone.number({ style: "international" }));
        }

        for (let i: number = 0; i < emailsCount; i++) {
            emails.push(faker.internet.email());
        }

        const residentGendersAvailable: boolean = faker.datatype.boolean(0.5);
        const maleResidents: number = faker.number.int({ min: 10, max: 50 });
        const femaleResidents: number = faker.number.int({ min: 10, max: 50 });
        const totalResidents: number = maleResidents + femaleResidents;

        return {
            name: faker.company.name(),
            type: faker.helpers.arrayElement([
                "Remand Home",
                "Safe Home",
                "Certified School",
                "State Receiving Home",
                "Approved Home",
                "Detention Home",
                "Training and Counseling Center",
                "Voluntary Children's Home",
            ]),
            location: {
                address: faker.location.streetAddress(),
                province: faker.location.state(),
                district: faker.location.county(),
                divisionalSecretariat: faker.location.city(),
            },
            contact: {
                phone: faker.datatype.boolean(0.9) ? phoneNumbers : [],
                email: emails,
                website: faker.datatype.boolean(0.5)
                    ? faker.internet.url()
                    : null,
            },
            residents: {
                total: totalResidents,
                male: residentGendersAvailable ? maleResidents : null,
                female: residentGendersAvailable ? femaleResidents : null,
            },
            isTestData: true,
        };
    });
};

console.log(JSON.stringify(generateFakeData(20), null, 2));
