package com.CouponSystemP3.CouponSystemP3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableScheduling
public class CouponSystemP3Application {

	public static void main(String[] args) {

		SpringApplication.run(CouponSystemP3Application.class, args);
		System.out.println("CouponSystemP3Application Is Done");


	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}


}
