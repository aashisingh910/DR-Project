# backend/app/models/efficientnet_lora.py
import torch
import torch.nn as nn
from efficientnet_pytorch import EfficientNet
from peft import LoraConfig, get_peft_model

class LoRALayer(nn.Module):
    def __init__(self, in_dim, out_dim, rank=4, alpha=8):
        super().__init__()
        self.lora_A = nn.Linear(in_dim, rank, bias=False)
        self.lora_B = nn.Linear(rank, out_dim, bias=False)
        self.scaling = alpha / rank
        
        # Initialize like LoRA
        nn.init.kaiming_uniform_(self.lora_A.weight, a=5**0.5)
        nn.init.zeros_(self.lora_B.weight)

    def forward(self, x):
        return self.lora_B(self.lora_A(x)) * self.scaling

class EfficientNetB4LoRA(nn.Module):
    def __init__(self, num_classes=5, use_lora=True):
        super().__init__()
        
        # Base EfficientNet-B4
        self.backbone = EfficientNet.from_pretrained('efficientnet-b4')
        
        # Replace classifier with LoRA-enhanced version
        in_features = self.backbone._fc.in_features
        
        if use_lora:
            # Add LoRA adapters to attention layers
            self.lora_config = LoraConfig(
                r=8,
                lora_alpha=16,
                target_modules=["query", "value", "key"],
                lora_dropout=0.1,
                bias="none"
            )
            self.backbone = get_peft_model(self.backbone, self.lora_config)
        
        # Custom classification head with attention
        self.attention = nn.Sequential(
            nn.Linear(in_features, 512),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(512, 256),
            nn.ReLU(),
            nn.Dropout(0.2)
        )
        
        self.classifier = nn.Linear(256, num_classes)
        
    def forward(self, x):
        # Extract features
        features = self.backbone.extract_features(x)
        features = self.backbone._avg_pooling(features)
        features = features.flatten(1)
        
        # Apply attention
        attended = self.attention(features)
        
        # Classification
        output = self.classifier(attended)
        return output