# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visualTesting.spec.js >> @Smoke visual testing
- Location: tests\visualTesting.spec.js:12:1

# Error details

```
Error: expect(Buffer).toMatchSnapshot(expected) failed

  3649 pixels (ratio 0.01 of all image pixels) are different.

  Snapshot: visualTest/landing-page.png

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - navigation [ref=e3]:
    - link "About" [ref=e4] [cursor=pointer]:
      - /url: https://about.google/?fg=1&utm_source=google-IN&utm_medium=referral&utm_campaign=hp-header
    - link "Store" [ref=e5] [cursor=pointer]:
      - /url: https://store.google.com/IN?utm_source=hp_header&utm_medium=google_ooo&utm_campaign=GS100042&hl=en-IN
    - generic [ref=e7]:
      - generic [ref=e8]:
        - link "Gmail" [ref=e10] [cursor=pointer]:
          - /url: https://mail.google.com/mail/&ogbl
        - link "Search for Images" [ref=e12] [cursor=pointer]:
          - /url: https://www.google.com/imghp?hl=en&ogbl
          - text: Images
      - button "Google apps" [ref=e15] [cursor=pointer]
      - link "Sign in" [ref=e20] [cursor=pointer]:
        - /url: https://accounts.google.com/ServiceLogin?hl=en&passive=true&continue=https://www.google.com/&ec=futura_exp_og_so_72776762_e
  - img "Google" [ref=e23]
  - search [ref=e31]:
    - generic [ref=e33]:
      - generic [ref=e35]:
        - button "Add files and tools" [ref=e40] [cursor=pointer]
        - combobox "Search" [active] [ref=e45]
        - generic [ref=e46]:
          - generic [ref=e47]:
            - button "Search by voice" [ref=e50] [cursor=pointer]
            - button "Search by image" [ref=e55] [cursor=pointer]
          - link "AI Mode" [ref=e58] [cursor=pointer]
      - generic [ref=e67]:
        - button "Create images" [ref=e68] [cursor=pointer]:
          - generic [aria-hidden] [ref=e69]: 🍌
        - button "Ask about files" [ref=e71] [cursor=pointer]
        - button "Brainstorm" [ref=e76] [cursor=pointer]
        - button "I'm Feeling Lucky" [ref=e81] [cursor=pointer]
  - generic [ref=e85]:
    - text: "Google offered in:"
    - link "हिन्दी" [ref=e86] [cursor=pointer]:
      - /url: https://www.google.com/setprefs?sig=0_Jelmsx_M7Mah3SAq9uGOkxrX1SU%3D&hl=hi&source=homepage&sa=X&ved=0ahUKEwjey8a4isuXAxXESmwGHXI6AZ4Q2ZgBCCw
    - link "বাংলা" [ref=e87] [cursor=pointer]:
      - /url: https://www.google.com/setprefs?sig=0_Jelmsx_M7Mah3SAq9uGOkxrX1SU%3D&hl=bn&source=homepage&sa=X&ved=0ahUKEwjey8a4isuXAxXESmwGHXI6AZ4Q2ZgBCC0
    - link "తెలుగు" [ref=e88] [cursor=pointer]:
      - /url: https://www.google.com/setprefs?sig=0_Jelmsx_M7Mah3SAq9uGOkxrX1SU%3D&hl=te&source=homepage&sa=X&ved=0ahUKEwjey8a4isuXAxXESmwGHXI6AZ4Q2ZgBCC4
    - link "मराठी" [ref=e89] [cursor=pointer]:
      - /url: https://www.google.com/setprefs?sig=0_Jelmsx_M7Mah3SAq9uGOkxrX1SU%3D&hl=mr&source=homepage&sa=X&ved=0ahUKEwjey8a4isuXAxXESmwGHXI6AZ4Q2ZgBCC8
    - link "தமிழ்" [ref=e90] [cursor=pointer]:
      - /url: https://www.google.com/setprefs?sig=0_Jelmsx_M7Mah3SAq9uGOkxrX1SU%3D&hl=ta&source=homepage&sa=X&ved=0ahUKEwjey8a4isuXAxXESmwGHXI6AZ4Q2ZgBCDA
    - link "ગુજરાતી" [ref=e91] [cursor=pointer]:
      - /url: https://www.google.com/setprefs?sig=0_Jelmsx_M7Mah3SAq9uGOkxrX1SU%3D&hl=gu&source=homepage&sa=X&ved=0ahUKEwjey8a4isuXAxXESmwGHXI6AZ4Q2ZgBCDE
    - link "ಕನ್ನಡ" [ref=e92] [cursor=pointer]:
      - /url: https://www.google.com/setprefs?sig=0_Jelmsx_M7Mah3SAq9uGOkxrX1SU%3D&hl=kn&source=homepage&sa=X&ved=0ahUKEwjey8a4isuXAxXESmwGHXI6AZ4Q2ZgBCDI
    - link "മലയാളം" [ref=e93] [cursor=pointer]:
      - /url: https://www.google.com/setprefs?sig=0_Jelmsx_M7Mah3SAq9uGOkxrX1SU%3D&hl=ml&source=homepage&sa=X&ved=0ahUKEwjey8a4isuXAxXESmwGHXI6AZ4Q2ZgBCDM
    - link "ਪੰਜਾਬੀ" [ref=e94] [cursor=pointer]:
      - /url: https://www.google.com/setprefs?sig=0_Jelmsx_M7Mah3SAq9uGOkxrX1SU%3D&hl=pa&source=homepage&sa=X&ved=0ahUKEwjey8a4isuXAxXESmwGHXI6AZ4Q2ZgBCDQ
  - contentinfo [ref=e96]:
    - generic [ref=e97]: India
    - generic [ref=e98]:
      - generic [ref=e99]:
        - link "Advertising" [ref=e100] [cursor=pointer]:
          - /url: https://www.google.com/intl/en_in/ads/?subid=ww-ww-et-g-awa-a-g_hpafoot1_1!o2&utm_source=google.com&utm_medium=referral&utm_campaign=google_hpafooter&fg=1
        - link "Business" [ref=e101] [cursor=pointer]:
          - /url: https://www.google.com/services/?subid=ww-ww-et-g-awa-a-g_hpbfoot1_1!o2&utm_source=google.com&utm_medium=referral&utm_campaign=google_hpbfooter&fg=1
        - link "How Search works" [ref=e102] [cursor=pointer]:
          - /url: https://google.com/search/howsearchworks/?fg=1
      - generic [ref=e103]:
        - link "Privacy" [ref=e104] [cursor=pointer]:
          - /url: https://policies.google.com/privacy?hl=en-IN&fg=1
        - link "Terms" [ref=e105] [cursor=pointer]:
          - /url: https://policies.google.com/terms?hl=en-IN&fg=1
        - button "Settings" [ref=e109] [cursor=pointer]
```

# Test source

```ts
  1  | const {test,expect}=require('@playwright/test');
  2  | 
  3  | test('screenshot',async({page})=> {
  4  |     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  5  |     await expect(page.locator("#displayed-text")).toBeVisible();
  6  |     await page.locator("#displayed-text").screenshot({path: "screenshots/element.png"});
  7  |     await page.locator("#hide-textbox").click();
  8  |     await page.screenshot({path: "screenshots/entirePage.png"});
  9  |     await expect(page.locator("#displayed-text")).toBeHidden();
  10 | })
  11 | 
  12 | test('@Smoke visual testing',async({page})=> {
  13 |     await page.goto("https://www.google.com/");
> 14 |     expect(await page.screenshot()).toMatchSnapshot('visualTest/landing-page.png');
     |                                     ^ Error: expect(Buffer).toMatchSnapshot(expected) failed
  15 | })
  16 | 
```