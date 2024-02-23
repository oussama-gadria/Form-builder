import { Box, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps } from "@chakra-ui/react"

const steps = [
    { title: 'Client Info', description: 'Step 1' },
    { title: 'Car Info', description: 'Step 2' },
]

interface StepperCreateClientProps {
    currentActiveStep: number;
}

export const StepperCreateClient = ({ currentActiveStep }: StepperCreateClientProps) => {

    return (
        <Stepper index={currentActiveStep}>
            {steps.map((step, index) => (
                <Step key={index}>
                    <StepIndicator>
                        <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                        />
                    </StepIndicator>

                    <Box flexShrink='0'>
                        <StepTitle>{step.title}</StepTitle>
                        <StepDescription>{step.description}</StepDescription>
                    </Box>

                    <StepSeparator />
                </Step>
            ))}
        </Stepper>
    )
}