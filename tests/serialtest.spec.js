import {test} from '@playwright/test'

test.describe("Product search",()=>{
    test.describe.configure({mode: 'serial'});

    test("Search",async({page})=>{
        await page.goto("https://www.google.com/")
    });

    test("rahul",async({page})=>{
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    });
});

test.describe("parallel test",()=>{
    test.describe.configure({mode:'parallel'});
    
     test("Search",async({page})=>{
        await page.goto("https://www.google.com/")
    });

    test("rahul",async({page})=>{
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    });
    
});