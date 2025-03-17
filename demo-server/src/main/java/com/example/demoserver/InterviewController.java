package com.example.demoserver;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class InterviewController {
    private final String apiKey;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public InterviewController() {
        Dotenv dotenv = Dotenv.load();
        this.apiKey = dotenv.get("TOGETHER_API_KEY");
    }

    @GetMapping("/interview/questions")
    public ResponseEntity<String> interviewQuestions(
            @RequestParam String skills,
            @RequestParam String experience,
            @RequestParam String role,
            @RequestParam String duration) {

        if (apiKey == null || apiKey.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: API Key is missing.");
        }

        String togetherApiUrl = "https://api.together.ai/v1/chat/completions";

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("messages", new Object[]{
                Map.of("role", "user", "content",
                        "Generate technical interview questions and answers for a " + role +
                        " with expertise in " + skills + " and " + experience + " years of experience and of "+ duration +" time." +
                        " Respond only with a JSON array of objects in the format:" +
                        " [{\"question\": \"What is Java?\", \"answer\": \"Java is a high-level programming language.\"}]." +
                        " No explanations, no additional text—just a valid JSON array.")
        });
        requestBody.put("model", "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo-128K");
        requestBody.put("temperature", 0.7);
        requestBody.put("top_p", 0.7);
        requestBody.put("top_k", 50);
        requestBody.put("repetition_penalty", 1);
        requestBody.put("stop", new String[]{"<|eot_id|>", "<|eom_id|>"});

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    togetherApiUrl,
                    HttpMethod.POST,
                    requestEntity,
                    String.class
            );

            if (!response.getStatusCode().is2xxSuccessful()) {
                return ResponseEntity.status(response.getStatusCode()).body("Error: API call failed.");
            }

            // Parse the JSON response
            JsonNode jsonResponse = objectMapper.readTree(response.getBody());
            JsonNode choicesNode = jsonResponse.path("choices");
System.out.println("choicesNode: " + choicesNode);
            if (choicesNode.isArray() && choicesNode.size() > 0) {
                JsonNode contentNode = choicesNode.get(0).path("message").path("content");

                // Ensure the response is a valid JSON array
                if (contentNode.isArray()) {
                    return ResponseEntity.ok(contentNode.toString());
                } else {
                    JsonNode parsedContent = objectMapper.readTree(contentNode.asText());
                     return ResponseEntity.ok(parsedContent.toString());
                }
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error: No valid response from AI.");
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing request: " + e.getMessage());
        }
    }
}