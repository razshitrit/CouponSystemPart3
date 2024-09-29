
interface GlobalUrlService {
    getBaseUrl(): string
}

class DevelopmentUrlService implements GlobalUrlService {
    getBaseUrl(): string {
        return "http://localhost:8080/";
    }
}

class ProductionUrlService implements GlobalUrlService {
    getBaseUrl(): string {
        return "/";
    }
}

const globalUrlService: GlobalUrlService = process.env.NODE_ENV === "development" ? new DevelopmentUrlService() : new ProductionUrlService();

export default globalUrlService