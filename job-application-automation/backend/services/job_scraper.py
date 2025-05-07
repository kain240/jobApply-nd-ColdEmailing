from bs4 import BeautifulSoup
import requests

class JobScraper:
    def __init__(self, job_portal_url):
        self.job_portal_url = job_portal_url

    def scrape_jobs(self):
        response = requests.get(self.job_portal_url)
        if response.status_code != 200:
            raise Exception("Failed to load page")

        soup = BeautifulSoup(response.text, 'html.parser')
        job_listings = []

        # Example scraping logic (this will vary based on the actual HTML structure of the job portal)
        for job_element in soup.find_all('div', class_='job-listing'):
            title = job_element.find('h2').text.strip()
            company = job_element.find('div', class_='company').text.strip()
            location = job_element.find('div', class_='location').text.strip()
            job_listings.append({
                'title': title,
                'company': company,
                'location': location
            })

        return job_listings

# Example usage:
# scraper = JobScraper('https://example.com/jobs')
# jobs = scraper.scrape_jobs()
# print(jobs)